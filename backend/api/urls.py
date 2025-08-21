from django.urls import include, path

urlpatterns = [
    path('api/endpoints/', include('endpoints.urls'))
]
