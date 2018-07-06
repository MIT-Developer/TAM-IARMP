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
    [Route("api/TbMLibraries")]
    public class TbMLibrariesController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbMLibrariesController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbMLibraries
        [HttpGet]
        public IEnumerable<TbMLibrary> GetTbMLibrary()
        {
            return _context.TbMLibrary;
        }

        // GET: api/TbMLibraries/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbMLibrary([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMLibrary = await _context.TbMLibrary.SingleOrDefaultAsync(m => m.Condition == id);

            if (tbMLibrary == null)
            {
                return NotFound();
            }

            return Ok(tbMLibrary);
        }

        // PUT: api/TbMLibraries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbMLibrary([FromRoute] string id, [FromBody] TbMLibrary tbMLibrary)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tbMLibrary.Condition)
            {
                return BadRequest();
            }

            _context.Entry(tbMLibrary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbMLibraryExists(id))
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

        // POST: api/TbMLibraries
        [HttpPost]
        public async Task<IActionResult> PostTbMLibrary([FromBody] TbMLibrary tbMLibrary)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbMLibrary.Add(tbMLibrary);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbMLibraryExists(tbMLibrary.Condition))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbMLibrary", new { id = tbMLibrary.Condition }, tbMLibrary);
        }

        // DELETE: api/TbMLibraries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMLibrary([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMLibrary = await _context.TbMLibrary.SingleOrDefaultAsync(m => m.Condition == id);
            if (tbMLibrary == null)
            {
                return NotFound();
            }

            _context.TbMLibrary.Remove(tbMLibrary);
            await _context.SaveChangesAsync();

            return Ok(tbMLibrary);
        }

        private bool TbMLibraryExists(string id)
        {
            return _context.TbMLibrary.Any(e => e.Condition == id);
        }
    }
}