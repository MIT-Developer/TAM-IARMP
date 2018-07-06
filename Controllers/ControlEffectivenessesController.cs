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
    [Route("api/ControlEffectivenesses")]
    public class ControlEffectivenessesController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public ControlEffectivenessesController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/ControlEffectivenesses
        [HttpGet]
        public IEnumerable<ControlEffectiveness> GetControlEffectiveness()
        {
            return _context.ControlEffectiveness;
        }

        // GET: api/ControlEffectivenesses/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetControlEffectiveness([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var controlEffectiveness = await _context.ControlEffectiveness.SingleOrDefaultAsync(m => m.Division == id);

            if (controlEffectiveness == null)
            {
                return NotFound();
            }

            return Ok(controlEffectiveness);
        }

        // PUT: api/ControlEffectivenesses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutControlEffectiveness([FromRoute] string id, [FromBody] ControlEffectiveness controlEffectiveness)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != controlEffectiveness.Division)
            {
                return BadRequest();
            }

            _context.Entry(controlEffectiveness).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ControlEffectivenessExists(id))
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

        // POST: api/ControlEffectivenesses
        [HttpPost]
        public async Task<IActionResult> PostControlEffectiveness([FromBody] ControlEffectiveness controlEffectiveness)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ControlEffectiveness.Add(controlEffectiveness);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ControlEffectivenessExists(controlEffectiveness.Division))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetControlEffectiveness", new { id = controlEffectiveness.Division }, controlEffectiveness);
        }

        // DELETE: api/ControlEffectivenesses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteControlEffectiveness([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var controlEffectiveness = await _context.ControlEffectiveness.SingleOrDefaultAsync(m => m.Division == id);
            if (controlEffectiveness == null)
            {
                return NotFound();
            }

            _context.ControlEffectiveness.Remove(controlEffectiveness);
            await _context.SaveChangesAsync();

            return Ok(controlEffectiveness);
        }

        private bool ControlEffectivenessExists(string id)
        {
            return _context.ControlEffectiveness.Any(e => e.Division == id);
        }
    }
}