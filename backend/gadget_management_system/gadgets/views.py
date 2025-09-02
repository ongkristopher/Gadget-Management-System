from rest_framework import viewsets, permissions
from gadget_management_system.gadgets.models import Gadget
from gadget_management_system.gadgets.serializers import GadgetSerializer
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


class GadgetViewSet(viewsets.ModelViewSet):
    serializer_class = GadgetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Gadget.objects.filter(owner=self.request.user)

    def broadcast_update(self, action, user):
        channel_layer = get_channel_layer()
        data = {
            "action": action,
            "gadgets": GadgetSerializer(
                Gadget.objects.filter(owner=user), many=True
            ).data,
        }
        async_to_sync(channel_layer.group_send)(
            f"gadgets_{user.id}", {"type": "gadget_update", "data": data}
        )

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        self.broadcast_update("created", self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)
        self.broadcast_update("updated", self.request.user)

    def perform_destroy(self, instance):
        instance.delete()
        self.broadcast_update("deleted", self.request.user)
