import os

SUPPORTED_EXTENSIONS = (
    ".py",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".java",
    ".cpp",
    ".c",
    ".cs",
    ".go",
    ".php",
    ".rb",
)


def read_repository(path: str):
    files = []

    for root, _, filenames in os.walk(path):
        for filename in filenames:

            if filename.endswith(SUPPORTED_EXTENSIONS):

                file_path = os.path.join(root, filename)

                try:
                    with open(
                        file_path,
                        "r",
                        encoding="utf-8",
                        errors="ignore",
                    ) as f:

                        files.append(
                            {
                                "path": file_path,
                                "content": f.read(),
                            }
                        )

                except Exception:
                    pass

    return files