using System;

namespace server.Models
{
    public class CasbinPolicy
    {
        public int Id { get; set; }
        public string? PolicyType { get; set; }
        public string? Subject { get; set; }
        public string? Domain { get; set; }
        public string? Object { get; set; }
        public string? Action { get; set; }
        public string? Effect { get; set; }
        public string? Conditions { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
