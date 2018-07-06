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
    [Route("api/TbMRiskIndicators")]
    public class TbMRiskIndicatorsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbMRiskIndicatorsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbMRiskIndicators
        [HttpGet]
        public IEnumerable<TbMRiskIndicator> GetTbMRiskIndicator()
        {
            return _context.TbMRiskIndicator;
        }

        // GET: api/TbMRiskIndicators/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbMRiskIndicator([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMRiskIndicator = await _context.TbMRiskIndicator.SingleOrDefaultAsync(m => m.YearActive == id);

            if (tbMRiskIndicator == null)
            {
                return NotFound();
            }

            return Ok(tbMRiskIndicator);
        }

        // PUT: api/TbMRiskIndicators/5
        [HttpPut]
        public async Task<IActionResult> PutTbMRiskIndicator([FromRoute] short id, [FromBody] TbMRiskIndicator tbMRiskIndicator)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

        

            _context.Entry(tbMRiskIndicator).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbMRiskIndicatorExists(id))
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

        // POST: api/TbMRiskIndicators
        [HttpPost]
        public async Task<IActionResult> PostTbMRiskIndicator([FromBody] TbMRiskIndicator tbMRiskIndicator)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbMRiskIndicator.Add(tbMRiskIndicator);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbMRiskIndicatorExists(tbMRiskIndicator.YearActive))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbMRiskIndicator", new { id = tbMRiskIndicator.YearActive }, tbMRiskIndicator);
        }

        // DELETE: api/TbMRiskIndicators/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMRiskIndicator([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMRiskIndicator = await _context.TbMRiskIndicator.SingleOrDefaultAsync(m => m.YearActive == id);
            if (tbMRiskIndicator == null)
            {
                return NotFound();
            }

            _context.TbMRiskIndicator.Remove(tbMRiskIndicator);
            await _context.SaveChangesAsync();

            return Ok(tbMRiskIndicator);
        }

        private bool TbMRiskIndicatorExists(short id)
        {
            return _context.TbMRiskIndicator.Any(e => e.YearActive == id);
        }
    }
}