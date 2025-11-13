using System;

namespace server.Models
{
    public class Resource
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? ResourceType { get; set; }
        public int OwnerId { get; set; }
        public string? Department { get; set; }
        public string? Classification { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
