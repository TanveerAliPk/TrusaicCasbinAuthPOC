using server.Models;
using System.Linq;

namespace server.Data
{
    public static class DataSeeder
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Admins.Any())
            {
                return;   // DB has been seeded
            }

            var admin = new Admin
            {
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password")
            };
            context.Admins.Add(admin);
            context.SaveChanges();
        }
    }
}
