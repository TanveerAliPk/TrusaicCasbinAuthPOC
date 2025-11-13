using server.Models;
using System.Linq;

namespace server.Data
{
    public static class DataSeeder
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any())
            {
                return;   // DB has been seeded
            }

            var users = new User[]
            {
                new User{Name="Admin", Email="admin@example.com", Role="admin"},
                new User{Name="User", Email="user@example.com", Role="user"}
            };
            foreach (User u in users)
            {
                context.Users.Add(u);
            }
            context.SaveChanges();

            var roles = new Role[]
            {
                new Role{Name="admin", Description="Administrator"},
                new Role{Name="user", Description="User"}
            };
            foreach (Role r in roles)
            {
                context.Roles.Add(r);
            }
            context.SaveChanges();

            var policies = new CasbinPolicy[]
            {
                new CasbinPolicy{PolicyType="p", Subject="admin", Object="users", Action="read"},
                new CasbinPolicy{PolicyType="p", Subject="admin", Object="users", Action="write"},
                new CasbinPolicy{PolicyType="p", Subject="user", Object="users", Action="read"},
            };

            foreach (CasbinPolicy p in policies)
            {
                context.CasbinPolicies.Add(p);
            }
            context.SaveChanges();
        }
    }
}
