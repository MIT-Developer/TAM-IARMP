using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tam_risk_project.Models;

namespace tam_risk_project.Controllers
{
    [Produces("application/json")]
    [Route("api/ControlMappings")]
    public class ControlMappingsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public ControlMappingsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/ControlMappings
        [HttpGet]
        public IEnumerable<ControlMapping> GetControlMapping()
        {
            return _context.ControlMapping;
        }

        // GET: api/ControlMappings/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetControlMapping([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var controlMapping = await _context.ControlMapping.SingleOrDefaultAsync(m => m.Division == id);

            if (controlMapping == null)
            {
                return NotFound();
            }

            return Ok(controlMapping);
        }

        // PUT: api/ControlMappings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutControlMapping([FromRoute] string id, [FromBody] ControlMapping controlMapping)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != controlMapping.Division)
            {
                return BadRequest();
            }

            _context.Entry(controlMapping).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ControlMappingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ControlMappings
        [HttpPost]
        public async Task<IActionResult> PostControlMapping([FromBody] ControlMapping controlMapping)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ControlMapping.Add(controlMapping);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ControlMappingExists(controlMapping.Division))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetControlMapping", new { id = controlMapping.Division }, controlMapping);
        }

        // DELETE: api/ControlMappings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteControlMapping([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var controlMapping = await _context.ControlMapping.SingleOrDefaultAsync(m => m.Division == id);
            if (controlMapping == null)
            {
                return NotFound();
            }

            _context.ControlMapping.Remove(controlMapping);
            await _context.SaveChangesAsync();

            return Ok(controlMapping);
        }

        private bool ControlMappingExists(string id)
        {
            return _context.ControlMapping.Any(e => e.Division == id);
        }
    }
}