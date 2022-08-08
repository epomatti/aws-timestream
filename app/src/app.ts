import 'dotenv/config'
import {
  TimestreamWriteClient, TimestreamWriteClientConfig, WriteRecordsCommand, WriteRecordsCommandInput, _Record
} from "@aws-sdk/client-timestream-write";

(async () => {

  const configuration: TimestreamWriteClientConfig = { region: "us-east-1" }

  const writeClient = new TimestreamWriteClient(configuration);

  const currentTime = Date.now().toString(); // Unix time in milliseconds

  const dimensions = [
    { 'Name': 'region', 'Value': 'us-east-1' },
    { 'Name': 'az', 'Value': 'az1' },
    { 'Name': 'hostname', 'Value': 'host1' }
  ];

  const cpuUtilization = {
    'Dimensions': dimensions,
    'MeasureName': 'cpu_utilization',
    'MeasureValue': '13.5',
    'MeasureValueType': 'DOUBLE',
    'Time': currentTime.toString()
  };

  const memoryUtilization: _Record = {
    'Dimensions': dimensions,
    'MeasureName': 'memory_utilization',
    'MeasureValue': '40',
    'MeasureValueType': 'DOUBLE',
    'Time': currentTime.toString()
  };

  const records = [cpuUtilization, memoryUtilization];

  const input: WriteRecordsCommandInput = {
    DatabaseName: "timestream-sandbox",
    TableName: "orders",
    Records: records
  }

  const command = new WriteRecordsCommand(input);

  await writeClient.send(command);

})();