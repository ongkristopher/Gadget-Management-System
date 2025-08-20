from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.contrib.auth.models import User
from gadget_management_system.gadgets.models import Gadget

class Command(BaseCommand):
    help = "Load initial fixtures if database is empty"

    def handle(self, *args, **kwargs):
        if User.objects.exists() or Gadget.objects.exists():
            self.stdout.write(self.style.WARNING("Data already exists, skipping fixture load."))
        else:
            self.stdout.write(self.style.SUCCESS("Loading initial fixtures..."))
            call_command("loaddata", "initial_data.json")