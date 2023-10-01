locals {
  app                 = "reizt-todo-app"
  iam_user_name       = "${local.app}-vercel"
  iam_policy_name     = "${local.app}-vercel"
  dynamodb_table_name = local.app
}
