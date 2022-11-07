# Phala Stake Pool Monitor

#### Improved by project： https://github.com/Phala-Network/mining-data-server

A node.js server for stake pool monitor.

## Environment

- node.js
- yarn

## Clone
```shell
  git clone
```
## Notice！
### 1. Please make sure you have installed node.js and yarn.
### 2. Please modify the SMTP account and password under `src/model/mail.ts`!

    user = "***@***.com"    # Your SMTP account

    pass = "***"            # Your SMTP password

    host = "smtp.***.com"   # Your SMTP host

    port = 465              # Usually no changes are required

## Start Service

```
cd phaMonitor
yarn install
yarn build
yarn start
```
------------------------------
## Usage

### Create new subscriber
 * `POST  /register Content-Type: application/json {"pid": XXXX,"email": "XXXX@XXX.com"}`

    example: ``curl -H "Content-Type: application/json" -X POST -d '{"pid": XXXX,"email": "XXXX@XXX.com"}'  http://localhost:3001/register``

####  Your first subscription will be notified by email

### Show all subscribers
 * `GET  /pid-list`

   example: ``curl http://localhost:3001/pid-list``


### It is recommended to use pm2 to keep service alive
``` 
npm install -g pm2
cd phaMonitor
pm2 start dist/index.js --name="phaMonitor"
```
