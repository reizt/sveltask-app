terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.44.0"
    }
  }
  required_version = ">= 1.7.5"
}

variable "aws_profile" {
  type    = string
  default = "default"
}

provider "aws" {
  region  = "ap-northeast-1"
  profile = var.aws_profile
}
