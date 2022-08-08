# aws-timestream

Sandbox for Timestream.

Create the infrastructure:

```sh
terraform init
terraform apply -auto-approve
```

Install dependencies:

```sh
yarn install
```

Run the script to send data to Timestream:

```sh
yarn run app
```

After writing data, connect to the console and run a query:

```sql
SELECT * FROM "timestream-sandbox"."orders" WHERE time between ago(15m) and now() ORDER BY time DESC LIMIT 10 
```

#### Clean-up

```sh
terraform destroy -auto-approve
```