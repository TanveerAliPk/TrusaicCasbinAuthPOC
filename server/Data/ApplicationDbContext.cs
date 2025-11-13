using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserAttribute> UserAttributes { get; set; }
        public DbSet<CasbinPolicy> CasbinPolicies { get; set; }
        public DbSet<Resource> Resources { get; set; }
    }
}
