# ALES
This tool will help us to get API level latency for all CUJ's.
# Start Server:
~ npm i && npm run start:dev ~

# ALES TOOL UI:

port: 3000

http://localhost:3000

<img width="1510" alt="Screenshot 2023-08-02 at 9 18 49 AM" src="https://github.com/sabharanikumar/ALES/assets/119396551/b88dca59-d807-40e1-9ae4-0aeed6927e38">

# Output:

| Platform      | CUJ → API(Path)                              | Prod Max (JULY 14th) ms | Stage Max (JULY 14th) ms |
| ------------- | -------------------------------------------- | -------------------- | --------------------  |
| `WEB`         | App Launch → token?realm=bolt                | $\textcolor{red}{\textsf{4250}}$              |   $\textcolor{green}{\textsf{1740}}$            |
| `WEB`         | App Launch → cms/collections/mobile-menu-bar | $\textcolor{red}{\textsf{1830}}$                 | $\textcolor{green}{\textsf{1251}}$             |
| `WEB`         | App Launch → /cms/configs/auth               | $\textcolor{red}{\textsf{4335}}$                |   $\textcolor{green}{\textsf{116}}$               |
| `WEB`         | App Launch → users/me                        | $\textcolor{red}{\textsf{1554}}$                 | $\textcolor{green}{\textsf{1184}}$                 |
| `WEB`         | App Launch → cms/config/gi-web-sdk-config    | $\textcolor{red}{\textsf{989}}$                  |  $\textcolor{green}{\textsf{114}}$                |
| `WEB`         | App Launch → /cms/collections/web-footer     | $\textcolor{red}{\textsf{4229}}$                 |  $\textcolor{green}{\textsf{207}}$               |
