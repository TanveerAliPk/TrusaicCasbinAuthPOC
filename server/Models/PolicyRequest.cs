namespace server.Models
{
    public class PolicyRequest
    {
        public string Subject { get; set; } = string.Empty;
        public string Domain { get; set; } = string.Empty;
        public string Object { get; set; } = string.Empty;
        public string Action { get; set; } = string.Empty;
    }
}
