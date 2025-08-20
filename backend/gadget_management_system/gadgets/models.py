from django.db import models
from django.contrib.auth.models import User

class Gadget(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="gadgets")

    def __str__(self):
        return self.name