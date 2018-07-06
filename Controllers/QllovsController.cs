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
    [Route("api/Qllovs")]
    public class QllovsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public QllovsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/Qllovs
        [HttpGet]
        public IEnumerable<Qllov> GetQllov()
        {
            return _context.Qllov;
        }

        // GET: api/Qllovs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQllov([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var qllov = await _context.Qllov.SingleOrDefaultAsync(m => m.YearActive == id);

            if (qllov == null)
            {
                return NotFound();
            }

            return Ok(qllov);
        }

        // PUT: api/Qllovs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQllov([FromRoute] short id, [FromBody] Qllov qllov)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != qllov.YearActive)
            {
                return BadRequest();
            }

            _context.Entry(qllov).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QllovExists(id))
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

        // POST: api/Qllovs
        [HttpPost]
        public async Task<IActionResult> PostQllov([FromBody] Qllov qllov)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Qllov.Add(qllov);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (QllovExists(qllov.YearActive))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetQllov", new { id = qllov.YearActive }, qllov);
        }

        // DELETE: api/Qllovs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQllov([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var qllov = await _context.Qllov.SingleOrDefaultAsync(m => m.YearActive == id);
            if (qllov == null)
            {
                return NotFound();
            }

            _context.Qllov.Remove(qllov);
            await _context.SaveChangesAsync();

            return Ok(qllov);
        }

        private bool QllovExists(short id)
        {
            return _context.Qllov.Any(e => e.YearActive == id);
        }
    }
}