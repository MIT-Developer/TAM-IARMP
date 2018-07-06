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
    [Route("api/DraftRisks")]
    public class DraftRisksController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public DraftRisksController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/DraftRisks
        [HttpGet]
        public IEnumerable<DraftRisk> GetDraftRisk()
        {
            return _context.DraftRisk;
        }

        // GET: api/DraftRisks/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDraftRisk([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var draftRisk = await _context.DraftRisk.SingleOrDefaultAsync(m => m.DraftKey == id);

            if (draftRisk == null)
            {
                return NotFound();
            }

            return Ok(draftRisk);
        }

        // PUT: api/DraftRisks/5
        [HttpPut]
        public async Task<IActionResult> PutDraftRisk([FromRoute] string id, [FromBody] DraftRisk draftRisk)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(draftRisk).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DraftRiskExists(id))
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

        // POST: api/DraftRisks
        [HttpPost]
        public async Task<IActionResult> PostDraftRisk([FromBody] DraftRisk draftRisk)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DraftRisk.Add(draftRisk);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDraftRisk", new { id = draftRisk.DraftKey }, draftRisk);
        }

        // DELETE: api/DraftRisks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDraftRisk([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var draftRisk = await _context.DraftRisk.SingleOrDefaultAsync(m => m.DraftKey == id);
            if (draftRisk == null)
            {
                return NotFound();
            }

            _context.DraftRisk.Remove(draftRisk);
            await _context.SaveChangesAsync();

            return Ok(draftRisk);
        }

        private bool DraftRiskExists(string id)
        {
            return _context.DraftRisk.Any(e => e.DraftKey == id);
        }
    }
}