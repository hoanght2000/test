using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.Extensions.Options;
using server_2._2.Data;
using server_2._2.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using System.Security.Cryptography;

namespace server_2._2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserApi : ControllerBase
    {
        private readonly MyDbContext db;
        private readonly AppSettings appsettings;

        public UserApi(MyDbContext _db,IOptionsMonitor<AppSettings> optionsMonitor) {
            db = _db;
            appsettings = optionsMonitor.CurrentValue;
        }

        [HttpPost("login")]
        public IActionResult Validate([FromBody]LoginModel user) {
            var currentUser = db.Users.FirstOrDefault(p=>p.Mail == user.Mail && p.Password == user.Password);
            if (currentUser == null)
            {
                return Ok(new ApiResponse
                {
                    Message = "Invalide Email",
                });
                
            }
            return Ok(new ApiResponse
            {
                Message ="Login success",
                Data = GenerateToken(currentUser)

            });

           
        }

        public TokenModel GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var secretKeyBytes = Encoding.UTF8.GetBytes(appsettings.SecretKey);
            var tokenDecription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Email, user.Mail),
                    new Claim("Id", user.Id.ToString()),

                }),
                Expires = DateTime.UtcNow.AddSeconds(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKeyBytes),SecurityAlgorithms.HmacSha256Signature)

            };
            var token = tokenHandler.CreateToken(tokenDecription);
            var accessToken = tokenHandler.WriteToken(token);
            var refreshToken = GenerateRefreshToken();


            return new TokenModel
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                Mail = user.Mail,
                Expris = tokenDecription.Expires
            };
        }

        private string GenerateRefreshToken()
        {
            var random = new Byte[32];
            using(var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(random); 
                return Convert.ToBase64String(random);
            }

        }

        [HttpPost("refresh_token/{mail}")]
        public IActionResult RefreshTK(string mail)
        {
            var currentUser = db.Users.FirstOrDefault(p=>p.Mail == mail);
            if (currentUser != null)
            {
                return Ok(new ApiResponse
                {
                    Message= "RefeshToken success",
                    Data = GenerateToken(currentUser)
                });
            }
            return BadRequest(new ApiResponse
            {
                Message = "Something went wrong"
            });
        }

        [HttpPost("register")]
        public IActionResult Signup(LoginModel model)
        {
                var newUser = new User
                {
                    Mail = model.Mail,
                    Password = model.Password,
                };
            try
            {
                db.Add(newUser);
                db.SaveChanges();
                return Ok(new ApiResponse
                {
                    Message = "Register success",
                    Data = GenerateToken(newUser)

                });

            }
            catch
            {
                return BadRequest("something went wrong");
            }
        }

    }
}
