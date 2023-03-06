using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using server_2._2.Data;
using server_2._2.Models;
using Microsoft.AspNetCore.Authorization;

namespace server_2._2.Controllers
{
    [Route("api/[controller]")]
     
    [ApiController]
    public class BlogApi : ControllerBase
    {
        public readonly MyDbContext context;
        public BlogApi(MyDbContext db)
        {
            context = db;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var blogs = context.Blogs.ToList();
            return Ok(blogs);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var blogCurrent = context.Blogs.FirstOrDefault(blog => blog.Id == Guid.Parse(id));
            if (blogCurrent != null)
            {
                return Ok(blogCurrent);
            }
            return NotFound();
        }

        [HttpPost]
        [Authorize]
        public IActionResult Create(BlogModel blog)
        {
            var newBlog = new Blog
            {
                Id = Guid.NewGuid(),
                Title = blog.Title,
                Author = blog.Author,
                ImageURL = blog.ImageUrl,
                Description = blog.Description
            };
            try
            {
                context.Add(newBlog);
                context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, newBlog);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, BlogModel blogModel)
        {
            var blogCurrent = context.Blogs.FirstOrDefault(blog => blog.Id == Guid.Parse(id));
            if (blogCurrent != null)
            {
                blogCurrent.Title = blogModel.Title;
                blogCurrent.Description = blogModel.Description;
                blogCurrent.ImageURL = blogModel.ImageUrl;
                context.SaveChanges();
                return NoContent();
            } 
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var blogCurrent = context.Blogs.FirstOrDefault(blog => blog.Id == Guid.Parse(id));
            if (blogCurrent != null)
            {
                context.Remove(blogCurrent);
                context.SaveChanges();

            }
            return NoContent();
        }
    }
}
