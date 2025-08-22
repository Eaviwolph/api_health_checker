from django.utils import timezone
import uuid
import requests
from django.db import models


class Endpoint(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    url = models.URLField()
    method = models.CharField(max_length=10, choices=[("GET", "GET"), ("POST", "POST")])
    expected_status = models.IntegerField()
    last_check = models.DateTimeField(null=True, blank=True)
    last_status = models.IntegerField(null=True, blank=True)
    last_response_time = models.DurationField(null=True, blank=True)
    is_healthy = models.BooleanField(null=True, blank=True)

    # Used for Http responses
    def __serialize__(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "url": self.url,
            "method": self.method,
            "expected_status": self.expected_status,
            "last_check": self.last_check,
            "last_status": self.last_status,
            "last_response_time": self.last_response_time,
            "is_healthy": self.is_healthy,
        }

    # Perform a request to the endpoint
    def check_endpoint(self):
        try:
            start_time = timezone.now()
            response = requests.request(method=self.method, url=self.url, timeout=5)
            self.last_check = timezone.now()
            self.last_status = response.status_code
            self.is_healthy = response.status_code == self.expected_status
            self.last_response_time = timezone.now() - start_time
            self.save()
        except requests.RequestException:
            self.last_check = timezone.now()
            self.last_status = None
            self.is_healthy = False
            self.save()
        HealthCheck.objects.create(
            endpoint=self,
            status=self.last_status,
            response_time=self.last_response_time,
        )

        return self.is_healthy


class HealthCheck(models.Model):
    endpoint = models.ForeignKey(Endpoint, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(null=True, blank=True)
    response_time = models.DurationField(null=True, blank=True)

    # Used for Http responses
    def __serialize__(self):
        return {
            "id": str(self.id),
            "timestamp": self.timestamp,
            "status": self.status,
            "response_time": self.response_time,
        }
