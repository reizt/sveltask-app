resource "aws_iam_user" "vercel" {
  name = local.iam_user_name
}

resource "aws_iam_user_policy_attachment" "vercel" {
  user       = aws_iam_user.vercel.name
  policy_arn = aws_iam_policy.vercel.arn
}

resource "aws_iam_policy" "vercel" {
  name   = local.iam_policy_name
  policy = data.aws_iam_policy_document.vercel.json
}

data "aws_iam_policy_document" "vercel" {
  statement {
    effect = "Allow"
    actions = [
      "dynamodb:BatchGetItem",
      "dynamodb:BatchWriteItem",
      "dynamodb:PutItem",
      "dynamodb:DeleteItem",
      "dynamodb:GetItem",
      "dynamodb:Scan",
      "dynamodb:Query",
      "dynamodb:UpdateItem",
    ]
    resources = [
      "${aws_dynamodb_table.main.arn}",
      "${aws_dynamodb_table.main.arn}/*",
    ]
  }
}
