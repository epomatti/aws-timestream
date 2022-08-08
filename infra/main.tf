terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.25.0"
    }
  }
  backend "local" {
    path = "./.workspace/terraform.tfstate"
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_timestreamwrite_database" "main" {
  database_name = "timestream-sandbox"
}

resource "aws_timestreamwrite_table" "orders" {
  database_name = aws_timestreamwrite_database.main.database_name
  table_name    = "orders"

  retention_properties {
    magnetic_store_retention_period_in_days = 30
    memory_store_retention_period_in_hours  = 12
  }

  tags = {
    Name = "orders"
  }
}
