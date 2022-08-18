import { HttpException, Injectable, Logger } from '@nestjs/common';
import * as ejs from 'ejs';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import { Readable, Writable } from 'stream';

const optionsLaunch: any = {};

@Injectable()
export class PdfService {
  async renderPdf(template: string, data: any) {
    const html = await ejs.render(template, { ...data }, { async: true });

    const outputHTML = `/tmp/html-find-all.html`;
    const outputPDF = `/tmp/pdf-find-all.pdf`;

    fs.writeFileSync(outputHTML, html);

    const browser = await puppeteer.launch({
      ...optionsLaunch,
      headless: true,
      args: ['--no-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(`file://${outputHTML}`, {
      waitUntil: ['load', 'networkidle2'],
    });

    const pdfReady = await page
      .pdf({
        path: outputPDF,
        format: 'a4',
        margin: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
        landscape: false,
        printBackground: true,
      })
      .catch((err) => {
        Logger.error(err, null, 'Gerar PDF');
        throw new HttpException('Houve um erro ao gerar o PDF do pedido', 400);
      });

    await browser.close();

    fs.unlinkSync(outputHTML);
    fs.unlinkSync(outputPDF);

    return pdfReady;
  }
}
