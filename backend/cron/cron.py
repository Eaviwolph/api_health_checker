import logging
import threading
import time

import concurrent
from api.settings import CRON_TASK_MAX_WORKERS, CRON_TASK_WAIT_TIME
from endpoints.models import Endpoint

# Set up logging
logger = logging.getLogger(__name__)

instanciated = False


def StartCron():
    global instanciated
    if instanciated:
        return
    instanciated = True

    def run_cron_job():
        while True:
            logger.info(
                f"Running cron job every {CRON_TASK_WAIT_TIME} seconds with {CRON_TASK_MAX_WORKERS} workers"
            )
            endpoints = Endpoint.objects.all()

            def check_endpoint(endpoint: Endpoint):
                logger.info(f"Perform health check on: {endpoint.name}")
                endpoint.check_endpoint()
                logger.info(
                    f"Endpoint {endpoint.name} responded with status {endpoint.last_status}"
                )

            # Thread pool of CRON_TASK_MAX_WORKERS workers to optimize requests
            with concurrent.futures.ThreadPoolExecutor(
                max_workers=CRON_TASK_MAX_WORKERS
            ) as executor:
                executor.map(check_endpoint, endpoints)

            time.sleep(CRON_TASK_WAIT_TIME)

    threading.Thread(target=run_cron_job, daemon=True).start()
