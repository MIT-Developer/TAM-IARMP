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
    [Route("api/Riskreports")]
    public class RiskreportsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public RiskreportsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/Riskreports
        [HttpGet]
        public IEnumerable<Riskreport> GetRiskreport()
        {
            return _context.Riskreport;
        }

        // GET: api/Riskreports/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRiskreport([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var riskreport = await _context.Riskreport.SingleOrDefaultAsync(m => m.YearActive == id);

            if (riskreport == null)
            {
                return NotFound();
            }

            return Ok(riskreport);
        }

        // PUT: api/Riskreports/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRiskreport([FromRoute] int id, [FromBody] Riskreport riskreport)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != riskreport.YearActive)
            {
                return BadRequest();
            }

            _context.Entry(riskreport).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RiskreportExists(id))
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

        // POST: api/Riskreports
        [HttpPost]
        public async Task<IActionResult> PostRiskreport([FromBody] Riskreport riskreport)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Riskreport.Add(riskreport);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RiskreportExists(riskreport.YearActive))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRiskreport", new { id = riskreport.YearActive }, riskreport);
        }

        // DELETE: api/Riskreports/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRiskreport([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var riskreport = await _context.Riskreport.SingleOrDefaultAsync(m => m.YearActive == id);
            if (riskreport == null)
            {
                return NotFound();
            }

            _context.Riskreport.Remove(riskreport);
            await _context.SaveChangesAsync();

            return Ok(riskreport);
        }

        private bool RiskreportExists(int id)
        {
            return _context.Riskreport.Any(e => e.YearActive == id);
        }
    }
}