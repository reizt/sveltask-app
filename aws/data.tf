data "aws_dynamodb_table" "main" {
  name = local.dynamodb_table_name
}
