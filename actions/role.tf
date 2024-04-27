data "aws_ecr_repository" "this" {
  name = "sveltask-app"
}

data "aws_lambda_function" "this" {
  function_name = "sveltask-app"
}

data "aws_api_gateway_rest_api" "this" {
  name = "sveltask"
}

resource "aws_iam_role" "actions" {
  name               = "${local.app}-actions-oidc"
  assume_role_policy = data.aws_iam_policy_document.actions_assume_role.json
}

resource "aws_iam_policy" "actions" {
  name   = "${local.app}-actions-oidc"
  policy = data.aws_iam_policy_document.actions.json
}

resource "aws_iam_role_policy_attachment" "actions" {
  role       = aws_iam_role.actions.name
  policy_arn = aws_iam_policy.actions.arn
}

data "aws_iam_policy_document" "actions" {
  statement {
    effect = "Allow"
    actions = [
      "ecr:BatchCheckLayerAvailability",
      "ecr:GetDownloadUrlForLayer",
      "ecr:GetRepositoryPolicy",
      "ecr:DescribeRepositories",
      "ecr:ListImages",
      "ecr:DescribeImages",
      "ecr:BatchGetImage",
      "ecr:GetLifecyclePolicy",
      "ecr:GetLifecyclePolicyPreview",
      "ecr:ListTagsForResource",
      "ecr:DescribeImageScanFindings",
      "ecr:InitiateLayerUpload",
      "ecr:UploadLayerPart",
      "ecr:CompleteLayerUpload",
      "ecr:PutImage"
    ]
    resources = [
      data.aws_ecr_repository.this.arn,
      "${data.aws_ecr_repository.this.arn}:*",
    ]
  }
  statement {
    effect = "Allow"
    actions = [
      "ecr:GetAuthorizationToken",
    ]
    resources = ["*"]
  }
  statement {
    effect = "Allow"
    actions = [
      "lambda:UpdateFunctionCode",
    ]
    resources = [
      data.aws_lambda_function.this.arn,
    ]
  }
  statement {
    effect = "Allow"
    actions = [
      "apigateway:GET",
      "apigateway:POST",
      "apigateway:PUT",
      "apigateway:DELETE",
      "apigateway:PATCH",
      "apigateway:HEAD",
      "apigateway:OPTIONS",
      "apigateway:ANY",
    ]
    resources = [
      "arn:aws:apigateway:${local.region}::/restapis/${data.aws_api_gateway_rest_api.this.id}/deployments"
    ]
  }
}

data "aws_iam_openid_connect_provider" "actions" {
  url = "https://token.actions.githubusercontent.com"
}

data "aws_iam_policy_document" "actions_assume_role" {
  statement {
    effect = "Allow"
    actions = [
      "sts:AssumeRoleWithWebIdentity",
    ]
    principals {
      type = "Federated"
      identifiers = [
        data.aws_iam_openid_connect_provider.actions.arn,
      ]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }
    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${local.github.user_name}/${local.github.repo_name}:*"]
    }
  }
}
