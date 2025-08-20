from rest_framework import viewsets, permissions
from gadget_management_system.gadgets.models import Gadget
from gadget_management_system.gadgets.serializers import GadgetSerializer

class GadgetViewSet(viewsets.ModelViewSet):
    serializer_class = GadgetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Gadget.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)