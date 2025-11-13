using System;

namespace server.Models
{
    public class UserAttribute
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? AttributeKey { get; set; }
        public string? AttributeValue { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
