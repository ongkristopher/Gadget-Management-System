from gadget_management_system.gadgets.models import Gadget
from rest_framework import serializers

class GadgetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Gadget
        fields = ["id", "name", "description", "created", "last_modified"]