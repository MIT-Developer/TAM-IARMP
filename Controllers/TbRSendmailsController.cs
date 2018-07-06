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
    [Route("api/TbRSendmails")]
    public class TbRSendmailsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbRSendmailsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbRSendmails
        [HttpGet]
        public IEnumerable<TbRSendmail> GetTbRSendmail()
        {
            return _context.TbRSendmail;
        }

        // GET: api/TbRSendmails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbRSendmail([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbRSendmail = await _context.TbRSendmail.SingleOrDefaultAsync(m => m.YearActive == id);

            if (tbRSendmail == null)
            {
                return NotFound();
            }

            return Ok(tbRSendmail);
        }

        // PUT: api/TbRSendmails/5
        [HttpPut]
        public async Task<IActionResult> PutTbRSendmail([FromRoute] short id, [FromBody] TbRSendmail tbRSendmail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(tbRSendmail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbRSendmailExists(id))
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

        // POST: api/TbRSendmails
        [HttpPost]
        public async Task<IActionResult> PostTbRSendmail([FromBody] TbRSendmail tbRSendmail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbRSendmail.Add(tbRSendmail);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbRSendmailExists(tbRSendmail.YearActive))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbRSendmail", new { id = tbRSendmail.YearActive }, tbRSendmail);
        }

        // DELETE: api/TbRSendmails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbRSendmail([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbRSendmail = await _context.TbRSendmail.SingleOrDefaultAsync(m => m.YearActive == id);
            if (tbRSendmail == null)
            {
                return NotFound();
            }

            _context.TbRSendmail.Remove(tbRSendmail);
            await _context.SaveChangesAsync();

            return Ok(tbRSendmail);
        }

        private bool TbRSendmailExists(short id)
        {
            return _context.TbRSendmail.Any(e => e.YearActive == id);
        }
    }
}