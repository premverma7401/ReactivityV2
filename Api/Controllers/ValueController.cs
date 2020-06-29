using System.Collections.Generic;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class ValueController : ControllerBase
    {
        private readonly DataContext _context;
        public ValueController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Value>>> GetValues()
        {
            var items = await _context.Value.ToListAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Value>> GetValueById(int id)
        {
            var items = await _context.Value.FindAsync(id);
            return Ok(items);
        }

        [HttpPost]
        public void SaveValue(Value vlm)
        {
            var vl = new Value
            {
                Name = vlm.Name
            };
            _context.Value.Add(vl);
            _context.SaveChanges();

        }
    }
}