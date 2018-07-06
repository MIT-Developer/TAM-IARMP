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
    [Route("api/RiskMovements")]
    public class RiskMovementsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public RiskMovementsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/RiskMovements
        [HttpGet]
        public IEnumerable<RiskMovement> GetRiskMovement()
        {
            return _context.RiskMovement;
        }

        // GET: api/RiskMovements/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRiskMovement([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var riskMovement = await _context.RiskMovement.SingleOrDefaultAsync(m => m.Division == id);

            if (riskMovement == null)
            {
                return NotFound();
            }

            return Ok(riskMovement);
        }

        // PUT: api/RiskMovements/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRiskMovement([FromRoute] string id, [FromBody] RiskMovement riskMovement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != riskMovement.Division)
            {
                return BadRequest();
            }

            _context.Entry(riskMovement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RiskMovementExists(id))
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

        // POST: api/RiskMovements
        [HttpPost]
        public async Task<IActionResult> PostRiskMovement([FromBody] RiskMovement riskMovement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.RiskMovement.Add(riskMovement);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RiskMovementExists(riskMovement.Division))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRiskMovement", new { id = riskMovement.Division }, riskMovement);
        }

        // DELETE: api/RiskMovements/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRiskMovement([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var riskMovement = await _context.RiskMovement.SingleOrDefaultAsync(m => m.Division == id);
            if (riskMovement == null)
            {
                return NotFound();
            }

            _context.RiskMovement.Remove(riskMovement);
            await _context.SaveChangesAsync();

            return Ok(riskMovement);
        }

        private bool RiskMovementExists(string id)
        {
            return _context.RiskMovement.Any(e => e.Division == id);
        }
    }
}