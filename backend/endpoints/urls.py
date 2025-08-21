from . import views
from django.urls import include, path

urlpatterns = [
    path("", views.endpoint, name="endpoint"),
    path("<uuid:id>/", views.endpoint_by_id, name="endpoint_by_id"),
    path("<uuid:id>/check/", views.endpoint_check, name="check_endpoint"),
    path("<uuid:id>/history/", views.endpoint_history, name="endpoint_history"),
]
