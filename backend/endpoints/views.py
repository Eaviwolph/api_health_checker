from django.http import (
    HttpResponse,
    HttpResponseBadRequest,
    HttpResponseNotAllowed,
    HttpResponseNotFound,
)
from django.views.decorators.csrf import csrf_exempt
from .models import Endpoint, HealthCheck
import json


# - GET /api/endpoints : List all monitored endpoints
# - POST /api/endpoints : Add a new endpoint to monitor
#       Required fields: name, url, method, expected_status
@csrf_exempt
def endpoint(request):
    if request.method == "GET":
        endpoints = Endpoint.objects.all()
        endpoints_data = [endpoint.__serialize__() for endpoint in endpoints]
        return HttpResponse(
            json.dumps(endpoints_data, default=str), content_type="application/json"
        )

    if request.method == "POST":
        data = json.loads(request.body)
        if not all(key in data for key in ["name", "url", "method", "expected_status"]):
            return HttpResponseBadRequest("Missing required fields")

        endpoint = Endpoint.objects.create(
            name=data["name"],
            url=data["url"],
            method=data["method"],
            expected_status=data["expected_status"],
            last_check=None,
            last_status=None,
            last_response_time=None,
            is_healthy=None,
        )

        endpoint.check_endpoint()
        return HttpResponse(
            json.dumps(endpoint.__serialize__(), default=str),
            content_type="application/json",
        )
    return HttpResponseNotAllowed(["GET", "POST"])


# - GET /api/endpoints/{id} : Return a specific endpoint
# - DELETE /api/endpoints/{id} : Delete an endpoint
@csrf_exempt
def endpoint_by_id(request, id):
    if request.method == "GET":
        try:
            endpoint = Endpoint.objects.get(id=id)
            return HttpResponse(
                json.dumps(endpoint.__serialize__(), default=str),
                content_type="application/json",
            )
        except Endpoint.DoesNotExist:
            return HttpResponseNotFound()
    if request.method == "DELETE":
        try:
            endpoint = Endpoint.objects.get(id=id)
            endpoint.delete()
            return HttpResponse(status=204)
        except Endpoint.DoesNotExist:
            return HttpResponseNotFound()
    return HttpResponseNotAllowed(["DELETE"])


# - GET /api/endpoints/{id}/check : Launch an immediate check of an endpoint
@csrf_exempt
def endpoint_check(request, id):
    if request.method == "GET":
        try:
            endpoint = Endpoint.objects.get(id=id)
            endpoint.check_endpoint()
            return HttpResponse(
                json.dumps(endpoint.__serialize__(), default=str),
                content_type="application/json",
            )
        except Endpoint.DoesNotExist:
            return HttpResponseNotFound()
    return HttpResponseNotAllowed(["GET"])


# - GET /api/endpoints/{id}/history : Return the last 10 status checks
@csrf_exempt
def endpoint_history(request, id):
    if request.method == "GET":
        try:
            endpoint = Endpoint.objects.get(id=id)
            health_checks = HealthCheck.objects.filter(endpoint=endpoint).order_by(
                "-timestamp"
            )[:10]
            health_checks_data = [
                health_check.__serialize__() for health_check in health_checks
            ]
            return HttpResponse(
                json.dumps(health_checks_data, default=str),
                content_type="application/json",
            )
        except Endpoint.DoesNotExist:
            return HttpResponseNotFound()
