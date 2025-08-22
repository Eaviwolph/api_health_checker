import logging
import threading
import time
import os

import concurrent
from api.settings import CRON_TASK_MAX_WORKERS, CRON_TASK_WAIT_TIME
from endpoints.models import Endpoint
from django.conf import settings

# Set up logging
logger = logging.getLogger(__name__)

instanciated = False


def StartCron():
    global instanciated

    if settings.DEBUG and os.environ.get("RUN_MAIN") != "true":
        logger.warning("Skipping cron start in autoreloader parent process")
        return

    if instanciated:
        return
    instanciated = True

    logger.info(
        f"Running cron job every {CRON_TASK_WAIT_TIME} seconds with {CRON_TASK_MAX_WORKERS} workers"
    )
    def run_cron_job():
        while True:
            endpoints = Endpoint.objects.all()

            def check_endpoint(endpoint: Endpoint):
                logger.info(f"Perform health check on: {endpoint.name}")
                endpoint.check_endpoint()
                logger.info(
                    f"Endpoint {endpoint.name} responded with status {endpoint.last_status}"
                )

            logger.info(f"Found {len(endpoints)} endpoints to check")
            # Thread pool of CRON_TASK_MAX_WORKERS workers to optimize requests
            with concurrent.futures.ThreadPoolExecutor(
                max_workers=CRON_TASK_MAX_WORKERS
            ) as executor:
                executor.map(check_endpoint, endpoints)

            time.sleep(CRON_TASK_WAIT_TIME)

    threading.Thread(target=run_cron_job, daemon=True).start()
