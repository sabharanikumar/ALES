# ALES
This tool will help us to get API level analysis.
Start Server:
npm i && npm run start:dev

# ALES TOOL UI:

<img width="1510" alt="Screenshot 2023-08-02 at 9 18 49 AM" src="https://github.com/sabharanikumar/ALES/assets/119396551/b88dca59-d807-40e1-9ae4-0aeed6927e38">

# Output:

| Platform      | CUJ → API(Path)                              | Prod Max (JULY 14th) | Stage Max (JULY 14th) |
| ------------- | -------------------------------------------- | -------------------- | --------------------  |
| `WEB`         | App Launch → token?realm=bolt                | <span style="color: red;">`4250`</span>               |      `1740`           |
| `WEB`         | App Launch → cms/collections/mobile-menu-bar | `1830`               |         `1251`        |
| `WEB`         | App Launch → /cms/configs/auth               | `4335`               |        `116`          |
| `WEB`         | App Launch → users/me                        | `1554`               |        `1184`         |
| `WEB`         | App Launch → cms/config/gi-web-sdk-config    | `989`                |         `989`         |
| `WEB`         | App Launch → /cms/collections/web-footer     | `4229`               |         `207`         |
