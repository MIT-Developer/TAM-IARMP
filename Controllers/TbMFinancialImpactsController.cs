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
    [Route("api/TbMFinancialImpacts")]
    public class TbMFinancialImpactsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbMFinancialImpactsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbMFinancialImpacts
        [HttpGet]
        public IEnumerable<TbMFinancialImpact> GetTbMFinancialImpact()
        {
            return _context.TbMFinancialImpact;
        }

        // GET: api/TbMFinancialImpacts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbMFinancialImpact([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMFinancialImpact = await _context.TbMFinancialImpact.SingleOrDefaultAsync(m => m.YearActive == id);

            if (tbMFinancialImpact == null)
            {
                return NotFound();
            }

            return Ok(tbMFinancialImpact);
        }

        // PUT: api/TbMFinancialImpacts/5
        [HttpPut]
        public async Task<IActionResult> PutTbMFinancialImpact([FromRoute] short id, [FromBody] TbMFinancialImpact tbMFinancialImpact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            _context.Entry(tbMFinancialImpact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbMFinancialImpactExists(id))
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

        // POST: api/TbMFinancialImpacts
        [HttpPost]
        public async Task<IActionResult> PostTbMFinancialImpact([FromBody] TbMFinancialImpact tbMFinancialImpact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbMFinancialImpact.Add(tbMFinancialImpact);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbMFinancialImpactExists(tbMFinancialImpact.YearActive))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbMFinancialImpact", new { id = tbMFinancialImpact.YearActive }, tbMFinancialImpact);
        }

        // DELETE: api/TbMFinancialImpacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMFinancialImpact([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMFinancialImpact = await _context.TbMFinancialImpact.SingleOrDefaultAsync(m => m.YearActive == id);
            if (tbMFinancialImpact == null)
            {
                return NotFound();
            }

            _context.TbMFinancialImpact.Remove(tbMFinancialImpact);
            await _context.SaveChangesAsync();

            return Ok(tbMFinancialImpact);
        }

        private bool TbMFinancialImpactExists(short id)
        {
            return _context.TbMFinancialImpact.Any(e => e.YearActive == id);
        }
    }
}