import os
import sys

PACKAGE_INSTALL_COMMAND: str = "npm install"
LOOKUP_SERVER_DIRECTORY: str = "discord-lookup-server"
ROOT_DIRECTORY: str = "discord-lookup"
DOTENV_DISCORD_BOT_TOKEN_VARIABLE_NAME: str = "DISCORD_BOT_TOKEN"
SPLITTER: str = '\\' if sys.platform.startswith("win32") else '/'

def get_current_dir_name() -> str:
    return os.getcwd().split(SPLITTER)[-1]

def is_path_name_discord_lookup() -> bool:
    return get_current_dir_name() == ROOT_DIRECTORY

def install_packages() -> None:
    print(f"Installing node packages. (DIR: {ROOT_DIRECTORY})")
    os.system(PACKAGE_INSTALL_COMMAND)
    print(f"Installed node packages. (DIR: {ROOT_DIRECTORY})")

    os.chdir(LOOKUP_SERVER_DIRECTORY)
    print(f"Installing node packages. (DIR: {LOOKUP_SERVER_DIRECTORY})")
    os.system(PACKAGE_INSTALL_COMMAND)
    print(f"Installed node packages. (DIR: {LOOKUP_SERVER_DIRECTORY})")
    os.chdir("..")
    print(f"CWD: {ROOT_DIRECTORY}")

def handle_discord_bot_token():
    token: str = str(input("discord bot token: "))
    os.chdir(LOOKUP_SERVER_DIRECTORY)
    with open(".env", "w") as f:
        f.write(f"{DOTENV_DISCORD_BOT_TOKEN_VARIABLE_NAME}=\"{token}\"")
        print("Created .env file.")

def main():
    install_packages()
    handle_discord_bot_token()

if __name__ == "__main__":
    if is_path_name_discord_lookup():
        main()
    else:
        print("ERR | CWD is supposed to be discord-lookup")
