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
    [Route("api/TbMOperationalImpacts")]
    public class TbMOperationalImpactsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbMOperationalImpactsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbMOperationalImpacts
        [HttpGet]
        public IEnumerable<TbMOperationalImpact> GetTbMOperationalImpact()
        {
            return _context.TbMOperationalImpact;
        }

        // GET: api/TbMOperationalImpacts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbMOperationalImpact([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMOperationalImpact = await _context.TbMOperationalImpact.SingleOrDefaultAsync(m => m.YearActive == id);

            if (tbMOperationalImpact == null)
            {
                return NotFound();
            }

            return Ok(tbMOperationalImpact);
        }

        // PUT: api/TbMOperationalImpacts/5
        [HttpPut]
        public async Task<IActionResult> PutTbMOperationalImpact([FromRoute] short id, [FromBody] TbMOperationalImpact tbMOperationalImpact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

         

            _context.Entry(tbMOperationalImpact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbMOperationalImpactExists(id))
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

        // POST: api/TbMOperationalImpacts
        [HttpPost]
        public async Task<IActionResult> PostTbMOperationalImpact([FromBody] TbMOperationalImpact tbMOperationalImpact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbMOperationalImpact.Add(tbMOperationalImpact);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbMOperationalImpactExists(tbMOperationalImpact.YearActive))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbMOperationalImpact", new { id = tbMOperationalImpact.YearActive }, tbMOperationalImpact);
        }

        // DELETE: api/TbMOperationalImpacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMOperationalImpact([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMOperationalImpact = await _context.TbMOperationalImpact.SingleOrDefaultAsync(m => m.YearActive == id);
            if (tbMOperationalImpact == null)
            {
                return NotFound();
            }

            _context.TbMOperationalImpact.Remove(tbMOperationalImpact);
            await _context.SaveChangesAsync();

            return Ok(tbMOperationalImpact);
        }

        private bool TbMOperationalImpactExists(short id)
        {
            return _context.TbMOperationalImpact.Any(e => e.YearActive == id);
        }
    }
}