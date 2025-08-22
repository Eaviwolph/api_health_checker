from django.apps import AppConfig
import sys


class EndpointsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "endpoints"

    def ready(self):
        # Only start cron job when running the development server
        if "runserver" in sys.argv:
            from cron.cron import StartCron

            StartCron()
