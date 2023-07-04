terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0.1"
    }
  }
  required_version = ">= 1.4.6"
}

provider "aws" {
  region  = "ap-northeast-1"
  profile = "default"
}
