from django.utils import timezone
import uuid
import requests
from django.db import models

"""
{
    "id": "uuid",
    "name": "API Production",
    "url": "https://api.example.com/health",
    "method": "GET", # GET ou POST
    "expected_status": 200,
    "last_check": "2024-01-15T10:30:00Z",
    "last_status": 200,
    "is_healthy": true
}
"""

class Endpoint(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    url = models.URLField()
    method = models.CharField(max_length=10, choices=[("GET", "GET"), ("POST", "POST")])
    expected_status = models.IntegerField()
    last_check = models.DateTimeField(null=True, blank=True)
    last_status = models.IntegerField(null=True, blank=True)
    is_healthy = models.BooleanField(null=True, blank=True)

    def __serialize__(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "url": self.url,
            "method": self.method,
            "expected_status": self.expected_status,
            "last_check": self.last_check,
            "last_status": self.last_status,
            "is_healthy": self.is_healthy
        }

    def check_endpoint(self):
        try:
            response = requests.request(
                method=self.method,
                url=self.url,
                timeout=5
            )
            self.last_check = timezone.now()
            self.last_status = response.status_code
            self.is_healthy = (response.status_code == self.expected_status)
            self.save()
        except requests.RequestException:
            self.last_check = timezone.now()
            self.last_status = None
            self.is_healthy = False
            self.save()
        HealthCheck.objects.create(
            endpoint=self,
            status=self.last_status
        )

class HealthCheck(models.Model):
    endpoint = models.ForeignKey(Endpoint, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(null=True, blank=True)

    def __serialize__(self):
        return {
            "id": str(self.id),
            "timestamp": self.timestamp,
            "status": self.status,
        }