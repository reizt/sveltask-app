resource "aws_dynamodb_table" "main" {
  name         = local.dynamodb_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
  attribute {
    name = "entityName"
    type = "S"
  }
  attribute {
    name = "user#email"
    type = "S"
  }
  attribute {
    name = "task#userId"
    type = "S"
  }

  global_secondary_index {
    name            = "gsi-entityName"
    hash_key        = "entityName"
    projection_type = "ALL"
  }
  global_secondary_index {
    name            = "gsi-user-email"
    hash_key        = "user#email"
    projection_type = "ALL"
  }
  global_secondary_index {
    name            = "gsi-task-userId"
    hash_key        = "task#userId"
    projection_type = "ALL"
  }
}
