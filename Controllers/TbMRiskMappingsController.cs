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
    [Route("api/TbMRiskMappings")]
    public class TbMRiskMappingsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbMRiskMappingsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbMRiskMappings
        [HttpGet]
        public IEnumerable<TbMRiskMapping> GetTbMRiskMapping()
        {
            return _context.TbMRiskMapping;
        }

        // GET: api/TbMRiskMappings/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbMRiskMapping([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMRiskMapping = await _context.TbMRiskMapping.SingleOrDefaultAsync(m => m.YearActive == id);

            if (tbMRiskMapping == null)
            {
                return NotFound();
            }

            return Ok(tbMRiskMapping);
        }

        // PUT: api/TbMRiskMappings/5
        [HttpPut]
        public async Task<IActionResult> PutTbMRiskMapping([FromRoute] short id, [FromBody] TbMRiskMapping tbMRiskMapping)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            _context.Entry(tbMRiskMapping).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbMRiskMappingExists(id))
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

        // POST: api/TbMRiskMappings
        [HttpPost]
        public async Task<IActionResult> PostTbMRiskMapping([FromBody] TbMRiskMapping tbMRiskMapping)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbMRiskMapping.Add(tbMRiskMapping);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbMRiskMappingExists(tbMRiskMapping.YearActive))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbMRiskMapping", new { id = tbMRiskMapping.YearActive }, tbMRiskMapping);
        }

        // DELETE: api/TbMRiskMappings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMRiskMapping([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMRiskMapping = await _context.TbMRiskMapping.SingleOrDefaultAsync(m => m.YearActive == id);
            if (tbMRiskMapping == null)
            {
                return NotFound();
            }

            _context.TbMRiskMapping.Remove(tbMRiskMapping);
            await _context.SaveChangesAsync();

            return Ok(tbMRiskMapping);
        }

        private bool TbMRiskMappingExists(short id)
        {
            return _context.TbMRiskMapping.Any(e => e.YearActive == id);
        }
    }
}