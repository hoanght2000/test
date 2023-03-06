using Microsoft.EntityFrameworkCore.Migrations;

namespace server_2._2.Migrations
{
    public partial class UdUser1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccessToken",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Expires",
                table: "User");

            migrationBuilder.DropColumn(
                name: "RefreshToken",
                table: "User");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AccessToken",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Expires",
                table: "User",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "RefreshToken",
                table: "User",
                nullable: true);
        }
    }
}
