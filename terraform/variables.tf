variable "contact_recipient_email" {
  description = "Email address that receives contact form notifications"
  type        = string
  sensitive   = true

  validation {
    condition     = can(regex("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", var.contact_recipient_email))
    error_message = "contact_recipient_email must be a valid email address."
  }
}
