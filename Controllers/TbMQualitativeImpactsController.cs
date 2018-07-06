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
    [Route("api/TbMQualitativeImpacts")]
    public class TbMQualitativeImpactsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbMQualitativeImpactsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbMQualitativeImpacts
        [HttpGet]
        public IEnumerable<TbMQualitativeImpact> GetTbMQualitativeImpact()
        {
            return _context.TbMQualitativeImpact;
        }

        // GET: api/TbMQualitativeImpacts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbMQualitativeImpact([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMQualitativeImpact = await _context.TbMQualitativeImpact.SingleOrDefaultAsync(m => m.YearActive == id);

            if (tbMQualitativeImpact == null)
            {
                return NotFound();
            }

            return Ok(tbMQualitativeImpact);
        }

        // PUT: api/TbMQualitativeImpacts/5
        [HttpPut]
        public async Task<IActionResult> PutTbMQualitativeImpact([FromRoute] short id, [FromBody] TbMQualitativeImpact tbMQualitativeImpact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            _context.Entry(tbMQualitativeImpact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbMQualitativeImpactExists(id))
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

        // POST: api/TbMQualitativeImpacts
        [HttpPost]
        public async Task<IActionResult> PostTbMQualitativeImpact([FromBody] TbMQualitativeImpact tbMQualitativeImpact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbMQualitativeImpact.Add(tbMQualitativeImpact);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbMQualitativeImpactExists(tbMQualitativeImpact.YearActive))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbMQualitativeImpact", new { id = tbMQualitativeImpact.YearActive }, tbMQualitativeImpact);
        }

        // DELETE: api/TbMQualitativeImpacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMQualitativeImpact([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMQualitativeImpact = await _context.TbMQualitativeImpact.SingleOrDefaultAsync(m => m.YearActive == id);
            if (tbMQualitativeImpact == null)
            {
                return NotFound();
            }

            _context.TbMQualitativeImpact.Remove(tbMQualitativeImpact);
            await _context.SaveChangesAsync();

            return Ok(tbMQualitativeImpact);
        }

        private bool TbMQualitativeImpactExists(short id)
        {
            return _context.TbMQualitativeImpact.Any(e => e.YearActive == id);
        }
    }
}