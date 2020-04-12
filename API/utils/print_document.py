"""File to print a document."""
import subprocess
import logging
import os
# * ----- Logger set-up ----- *
logger = logging.getLogger("[PRINT SERVER]")


def print_document(document_path: str) -> None:
    """
    Function to print a document.

    :param document_path: A string with the document path to print.
    """
    try:
        # Use the "lp" comend to print. 
        # "-d HP_DeskJet_2130_series" to select our printer
        subprocess.run(
            ["lp",
            document_path,
            "-d",
            "HP_DeskJet_2130_series"
            ]
        )
        logger.info(f"printing doc {os.path.basename(document_path)}...")

    except Exception as ex:
        logger.error(ex)


if __name__ == "__main__":
    print_document("ok")    